import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createComment() {
  // Создание одного комментария
  await prisma.comment.create({
    data: {
      title: 'First Comment',
      body: 'This is a comment body.',
      post: {
        connect: { id: 1 }, // Привязываем к посту с id 1
      },
    },
  });
  console.log('Comment created');
}

async function createMultipleComments() {
  // Создание множества комментариев
  await prisma.comment.createMany({
    data: [
      {
        title: 'Second Comment',
        body: 'This is the second comment.',
        postId: 1, // Привязка к посту с id 1
      },
      {
        title: 'Third Comment',
        body: 'This is the third comment.',
        postId: 1,
      },
    ],
  });
  console.log('Multiple comments created');
}

async function updateComment(id: number) {
  // Обновление комментария по id
  await prisma.comment.update({
    where: { id },
    data: {
      title: 'Updated Comment Title',
      body: 'Updated comment body',
    },
  });
  console.log(`Comment ${id} updated`);
}

async function deleteComment(id: number) {
  // Удаление комментария по id
  await prisma.comment.delete({
    where: { id },
  });
  console.log(`Comment ${id} deleted`);
}

async function findCommentById(id: number) {
  // Поиск комментария по id
  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  console.log(comment);
}

async function findCommentWithPost(id: number) {
  // Поиск комментария по id с выводом информации о посте
  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { post: true },
  });
  console.log(comment);
}

async function findPostWithComments(id: number) {
  // Поиск поста по id с комментариями
  const post = await prisma.post.findUnique({
    where: { id },
    include: { comments: true },
  });
  console.log(post);
}

async function linkExistingCommentsToPost() {
  // Подключение уже существующих комментариев к посту
  await prisma.comment.updateMany({
    where: {
        postId: undefined, // Исключаем комментарии, которые уже привязаны к посту
      },
      data: {
        postId: 1, // Привязываем к посту с id 1
      },
    });
    console.log('Comments linked to post');
}

async function createPostWithComments() {
  // Создание поста с комментариями (один запрос)
  await prisma.post.create({
    data: {
      name: 'Post with comments',
      author: 'Author',
      description: 'Post description',
      date: new Date(),
      comments: {
        create: [
          {
            title: 'Comment 1',
            body: 'First comment body',
          },
          {
            title: 'Comment 2',
            body: 'Second comment body',
          },
        ],
      },
    },
  });
  console.log('Post with comments created');
}

// Вызов функций сидов для тестирования
async function main() {
  await createComment();
  await createMultipleComments();
  await updateComment(1);
  await deleteComment(2);
  await findCommentById(1);
  await findCommentWithPost(1);
  await findPostWithComments(1);
  await linkExistingCommentsToPost();
  await createPostWithComments();
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

import { IError, ISuccess } from "../types";
import { Tag } from './types'
import tagsRepository from './tagsRepository';
// ну если делаешь так тут, то и делай try catch везде с учетом что repository может выкинуть ошибку
// Если репо может выкинуть ошибку, тогда делаем try catch, но лучше в контроллере
async function allTags(): Promise<ISuccess<Tag[]> | IError> {
    try {
        const tags = await tagsRepository.findTags();

        if (!tags || tags.length === 0) {
            return { status: 'error', message: 'Tags not found' };
        }

        return { status: 'success', data: tags };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: 'Internal server error' };
    }
}

const tagsService = {
    allTags,
};

export default tagsService;
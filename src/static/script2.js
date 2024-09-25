window.addEventListener('beforeunload', function (e) {
    const confirmationMessage = 'хочете покинути?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
});

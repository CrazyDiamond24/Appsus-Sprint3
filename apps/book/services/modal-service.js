export const modalService = {
    toggleModal
}

function toggleModal(state, elModal) {
    if (state) {
        elModal.classList.value = 'book-modal fade-in'
        document.body.classList.add('book-modal-open')
    } else {
        elModal.classList.value = 'book-modal fade-out'
        document.body.classList.remove('book-modal-open')
    }
}
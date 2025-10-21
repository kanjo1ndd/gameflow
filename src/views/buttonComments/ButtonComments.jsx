import './ButtonComments.css'

export function AllButtonComments() {
    return <>
        <div className='block-for-all-comments'>
            <div className='like-comment'><i className="bi bi-suit-heart" /> 2.5k</div>
            <div className='like-comment'><i className="bi bi-chat-left" /> 2.5k</div>
            <div className='like-comment-button'><i className="bi bi-upload" />Поділитись</div>
        </div>
    </>
}
import user from "../../assets/user.svg"
import notification from '../../assets/notification.svg'
import lock from '../../assets/lock.svg'
import block from "../../assets/block.svg"
import message from "../../assets/message.svg"
import comment from "../../assets/comment.svg"
export default function Setting(){
    return (
        <section>
            <div>
                <div>
                    <img src={user} alt="user"/>
                    <span>Edit profile</span>
                </div>
                <div>
                    <img src={notification} alt='notification'/>
                    <span>Notification</span>
                </div>
                <div>
                    <img src={lock} alt='account privacy'/>
                    <span>Account privacy</span>
                </div>
                <div>
                    <img src={block} alt='blocked'/>
                    <span>Blocked</span>
                </div>
                <div>
                    <img src={message} alt='messages'/>
                    <span>Messages</span>
                </div>
                <div>
                    <img src={comment} alt='comment'/>
                    <span>Comment</span>
                </div>
            </div>
            <div>

            </div>
        </section>
    )
}
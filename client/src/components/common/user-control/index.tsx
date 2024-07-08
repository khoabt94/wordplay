import UserFriendList from "./components/user-friend-list";
import UserProfile from "./components/user-profile";

export default function UserControl() {
    return (
        <div className="flex items-center gap-x-5">
            <UserFriendList />
            <UserProfile />
        </div>
    )
}
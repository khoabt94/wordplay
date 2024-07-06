import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";

const BASE_URL = '/friend'

export const getFriends = async (
): Promise<Api.FriendApi.GetFriendsResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/my-friend`);
};


export const getSentFriendRequests = async (
): Promise<Api.FriendApi.GetSentFriendRequestResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/sent-friend-request`);
};

export const getReceivedFriendRequests = async (
): Promise<Api.FriendApi.GetReceivedFriendRequestResponse> => {
  return await AxiosInstance.get(`${BASE_URL}/received-friend-request`);
};

export const sendFriendRequest = async (
  payload: Api.FriendApi.SendFriendRequest
): Promise<any> => {
  return await AxiosInstance.post(`${BASE_URL}/sent-friend-request`, payload);
};


export const deleteSentFriendRequest = async (
  { friend_request_id }: Api.FriendApi.DeleteSentFriendRequestParam
): Promise<Api.FriendApi.GetSentFriendRequestResponse> => {
  return await AxiosInstance.delete(`${BASE_URL}/sent-friend-request/${friend_request_id}`);
};

export const replyReceivedFriendRequest = async (
  { friend_request_id, is_accepted }: Api.FriendApi.ReplyReceivedFriendRequestsParam
): Promise<Api.FriendApi.GetSentFriendRequestResponse> => {
  return await AxiosInstance.patch(`${BASE_URL}/received-friend-request/${friend_request_id}`, { is_accepted });
};

export const deleteFriend = async (
  { friend_id }: Api.FriendApi.DeleteFriendParam
): Promise<Api.FriendApi.GetSentFriendRequestResponse> => {
  return await AxiosInstance.delete(`${BASE_URL}/my-friend/${friend_id}`);
};

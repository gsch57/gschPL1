
import Api from '@/services/Api'

export default {

  fetchPosts () {
    return Api().get('posts')
  },
  sendUpdateState (params) {
    return Api().put('updateState', {
      id: params.id,
      state : params.state
    })
  },
  sendUpdateData (params) {
    return Api().put('updateComment', {
      client: params.client,
      comments: params.comments,
      id: params.id,
      type: params.type
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  sendComment (params) {
    return Api().post('postComment', {
      client: params.client,
      comments: params.comments,
      user: params.user,
      type: params.type
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getComment() {
    return Api().get('getComment?nocache=' + Date.now() + Date.now() * 2)
  },
  deleteComment(param) {
    return Api().delete('deleteComment',
    {params: { id: param.id }})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
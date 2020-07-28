'use strict'
const Notify = use('App/Models/Notify')

class NotifyController {

  async index () {
    try {
      const notify = await Notify.query()
        .with('user')
        .with('recived')
        .fetch()

      return notify;
    } catch (err) {
      console.log(err);
    }
  }

  async getUnVisibleNotifications ({ params }) {
    try {
      const notify = await Notify.query()
        .with('user')
        .with('recived')
        .where('recived_id', params.id)
        .where('visible', null)
        .fetch()

      return notify;
    } catch (err) {
      console.log(err);
    }
  }

  async store ({ request, response, params }) {
    try {
      const { recived_id, user_id, subject_metter } = request.headers();
      const notify = new Notify();

      notify.subject_metter = subject_metter
      notify.recived_id = recived_id
      notify.user_id = user_id

      notify.save()

      return notify;

    } catch (err) {
      console.log(err);
    }
  }

  async show ({ params }) {
    try {
      const notify = await Notify.query()
        .with('user')
        .with('recived')
        .where('recived_id', params.id)
        .fetch()

      return notify;
    } catch (err) {
      console.log(err);
    }
  }

  async updateVisibleNotify ({ params }) {
    try {
      const notify = await Notify.findOrFail(params.id);

      notify.visible = true;
      notify.save();

      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = NotifyController
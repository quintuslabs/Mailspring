/* eslint no-unused-vars: 0*/
import _ from 'underscore';
import Thread from '../models/thread';
import Actions from '../actions'
import DatabaseStore from '../stores/database-store';
import ChangeMailTask from './change-mail-task';

export default class ChangeUnreadTask extends ChangeMailTask {
  constructor(options = {}) {
    super(options);
    this.source = options.source;
    this.unread = options.unread;
    this._canBeUndone = options.canBeUndone;
  }

  label() {
    return this.unread ? "Marking as unread" : "Marking as read";
  }

  description() {
    const count = this.threadIds.length;
    const type = count > 1 ? 'threads' : 'thread';

    if (this._isUndoTask) {
      return `Undoing changes to ${count} ${type}`;
    }

    const newState = this.unread ? "unread" : "read";
    if (count > 1) {
      return `Marked ${count} ${type} as ${newState}`;
    }
    return `Marked as ${newState}`;
  }

  canBeUndone() {
    if (this._canBeUndone == null) {
      return super.canBeUndone()
    }
    return this._canBeUndone
  }
}
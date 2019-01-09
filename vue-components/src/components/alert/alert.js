import Notification from './notification';

let messageInstance;

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice(options) {
  let instance = getMessageInstance();

  let _options;
  if (!options) {
    _options = { duration: 1.5, content: '' };
  } else if (typeof options === 'string') {
    _options = { duration: 1.5, content: options };
  } else {
    _options = options
  }

  const { content, duration } = _options;

  instance.add({
    content: content,
    duration, duration
  });
}

export default {
  info (options) {
    return notice(options);
  }
}
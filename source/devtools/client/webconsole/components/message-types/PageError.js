/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

// React & Redux
const { createFactory } = require("devtools/client/shared/vendor/react");
const PropTypes = require("devtools/client/shared/vendor/react-prop-types");
const Message = createFactory(require("devtools/client/webconsole/components/Message"));

PageError.displayName = "PageError";

PageError.propTypes = {
  message: PropTypes.object.isRequired,
  open: PropTypes.bool,
  timestampsVisible: PropTypes.bool.isRequired,
  serviceContainer: PropTypes.object,
  maybeScrollToBottom: PropTypes.func,
  inWarningGroup: PropTypes.bool.isRequired,
};

PageError.defaultProps = {
  open: false,
};

function PageError(props) {
  const {
    dispatch,
    message,
    open,
    repeat,
    serviceContainer,
    timestampsVisible,
    isPaused,
    maybeScrollToBottom,
    inWarningGroup,
  } = props;
  const {
    id: messageId,
    executionPoint,
    source,
    type,
    level,
    messageText,
    stacktrace,
    frame,
    exceptionDocURL,
    timeStamp,
    notes,
  } = message;

  let messageBody;
  if (typeof messageText === "string") {
    messageBody = messageText;
  } else if (typeof messageText === "object" && messageText.type === "longString") {
    messageBody = `${message.messageText.initial}…`;
  }

  return Message({
    dispatch,
    messageId,
    executionPoint,
    isPaused,
    open,
    collapsible: Array.isArray(stacktrace),
    source,
    type,
    level,
    topLevelClasses: [],
    indent: message.indent,
    inWarningGroup,
    messageBody,
    repeat,
    frame,
    stacktrace,
    serviceContainer,
    exceptionDocURL,
    timeStamp,
    notes,
    timestampsVisible,
    maybeScrollToBottom,
  });
}

module.exports = PageError;
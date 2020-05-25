const fetchRemoteEmojiList = require("./fetchRemoteEmojiList");
const getLocalDecomojiList = require("./getLocalDecomojiList");

const getUploadableDecomojiList = async (page, inputs) => {
  const LOG = inputs.debug || inputs.log;
  // 登録済みのカスタム絵文字リストを取得する
  const remoteEmojiList = await fetchRemoteEmojiList(page, inputs);

  // 対象デコモジリストを取得する
  const localDecomojiList = getLocalDecomojiList(inputs.categories, LOG);

  // remoteEmojiList と localDecomojiList を突合させて処理するアイテムだけのリストを作る
  const uploadableDecomojiList = localDecomojiList.filter((local) => {
    return (
      remoteEmojiList.findIndex((remote) => remote.name === local.name) === -1
    );
  });
  LOG &&
    console.log(
      `uploadableDecomojiList(${uploadableDecomojiList.length}): ${uploadableDecomojiList}`
    );
  return uploadableDecomojiList;
};

module.exports = getUploadableDecomojiList;

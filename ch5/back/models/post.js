module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // 테이블명 posts
    content: {
      type: DataTypes.TEXT, // 매우 긴 글
      allowNull: false,
    }, // createdAt, updatedAt 자동생성
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // UserId
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // RetweetId
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  };
  return Post;
};

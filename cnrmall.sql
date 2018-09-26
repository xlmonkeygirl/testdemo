/*
Navicat MySQL Data Transfer

Source Server         : cnrmall
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : cnrmall

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-09-26 14:12:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` varchar(255) DEFAULT NULL,
  `imgurl` char(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `seller` varchar(255) DEFAULT NULL,
  `trading` varchar(255) DEFAULT NULL,
  `goodsCommentPercent` varchar(255) DEFAULT NULL,
  `commentCount` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('G001', '../img/12.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '8990.99', '央广购物', '15', '40%', '10');
INSERT INTO `goodslist` VALUES ('G002', '../img/15.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '1000.00', '央广购物', '56', '40%', '52');
INSERT INTO `goodslist` VALUES ('G003', '../img/12.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '9040.00', '央广购物', '21', '40%', '20');
INSERT INTO `goodslist` VALUES ('G004', '../img/15.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '4873.00', '央广购物', '19', '40%', '16');
INSERT INTO `goodslist` VALUES ('G005', '../img/13.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '5392.00', '央广购物', '29', '40%', '23');
INSERT INTO `goodslist` VALUES ('G006', '../img/15.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '4278.00', '央广购物', '43', '40%', '38');
INSERT INTO `goodslist` VALUES ('G007', '../img/11.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '6422.00', '央广购物', '38', '40%', '34');
INSERT INTO `goodslist` VALUES ('G008', '../img/15.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '1289.00', '央广购物', '26', '40%', '24');
INSERT INTO `goodslist` VALUES ('G009', '../img/13.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '2987.00', '央广购物', '50', '40%', '36');
INSERT INTO `goodslist` VALUES ('G0010', '../img/12.jpg', '海尔(Haire)HSNF-30B8(E)史特�?', '家用电器', '#', '5134.00', '央广购物', '32', '40%', '30');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '貂蝉', '123456', '15638419565');
INSERT INTO `user` VALUES ('12', 'xiaohong', 'e10adc3949ba59abbe56e057f20f883e', '18337698879');
INSERT INTO `user` VALUES ('6', 'liangling', 'e10adc3949ba59abbe56e057f20f883e', 'phoneNumber');
INSERT INTO `user` VALUES ('7', 'sssssss', 'e10adc3949ba59abbe56e057f20f883e', 'phoneNumber');
INSERT INTO `user` VALUES ('8', 'htmlcss', 'e10adc3949ba59abbe56e057f20f883e', '15670627734');
INSERT INTO `user` VALUES ('9', '李光洙', 'e10adc3949ba59abbe56e057f20f883e', '15670687735');
INSERT INTO `user` VALUES ('10', '倪妮', 'e10adc3949ba59abbe56e057f20f883e', '15670697213');
INSERT INTO `user` VALUES ('11', '百里守约', 'e10adc3949ba59abbe56e057f20f883e', '15670627730');
SET FOREIGN_KEY_CHECKS=1;

<?php
	/*
		注册用户

			* 把数据写入数据库
	 */
	
	include 'connect.php';//require('connect.php');
	
	// 获取前端参数
	$username = isset($_GET['username']) ? $_GET['username'] : null;
	$password = isset($_GET['password']) ? $_GET['password'] : null;
	$phoneNumber = isset($_GET['phoneNumber']) ? $_GET['phoneNumber'] : null;


	if($username && $password && $phoneNumber){
		// 用户有效性验证
		$sql = "select * from user where username='$username' or phoneNumber ='$phoneNumber'";
		$result = $conn->query($sql);
		if($result->num_rows>0){
			echo "fail";
		}
		else{
			// 对密码进行加密
			$password = md5($password);
			
			// 写入数据库
			$sql = "insert into user(username,password,phoneNumber) values('$username','$password','$phoneNumber')";

			$result = $conn->query($sql);

			if($result){
				echo "success";
			}else{
				echo "fail";
			}
		}
	}else{
		echo "fail";
	}
?>
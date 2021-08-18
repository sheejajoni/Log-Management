package com.iThingsFoundation.iThings.Login;



import com.iThingsFoundation.iThings.Message.Message;



public class Login {
	
	private String userName;
	private String password;
	private int time;

	private Message message;
	
	
	
	public Login() {
		super();
	}



	



	public Login(String userName, String password, int time, Message message) {
		super();
		this.userName = userName;
		this.password = password;
		this.time = time;
		this.message = message;
	}







	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	


	public Date getTime() {
		return time;
	}







	public void setTime(Date time) {
		this.time = time;
	}







	public Message getMessage() {
		return message;
	}



	public void setMessage(Message message) {
		this.message = message;
	}
	
	
	
	
	

}

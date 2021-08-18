package com.iThingsFoundation.iThings.Login;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.iThingsFoundation.iThings.Message.Message;

@Service
public class LoginService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public Login loginUser(Login loginDetails) {
		System.out.println("ss--" + loginDetails.getPassword());

		Login login = new Login();
		Message msg = new Message();
		String sqlnew = "SELECT * FROM Login WHERE UserId=? and Status='active'";
		List<Map<String, Object>> rowsnew = jdbcTemplate.queryForList(sqlnew, loginDetails.getUserName());
		if (rowsnew.size() > 0) {
			
			msg.setErrorMessage("Instance Already Generated");
			login.setMessage(msg);
			
		}
		else
		{
		String sql = "SELECT  username,password from Login  where username=? and password=?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, loginDetails.getUserName(),
				loginDetails.getPassword());
		if (rows.size() > 0) {

			for (Map<String, Object> row : rows) {

				login.setUserName((String) row.get("username"));
				login.setTime(12);

				
				msg.setSuccessMessage("Successfully logged in");
				String logintime = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
				
				String loginsql = "update Login set login_time = ? where username = ?";
				int insertlogin=jdbcTemplate.update(loginsql,logintime);

				login.setMessage(msg);
				login.setTime(logintime);

			}

		} else {
			
			msg.setErrorMessage("Not Successfully logged in");
			login.setMessage(msg);

		}
		}
		return login;
	}

}

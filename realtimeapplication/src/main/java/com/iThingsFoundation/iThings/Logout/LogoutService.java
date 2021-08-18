package com.iThingsFoundation.iThings.Logout;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.iThingsFoundation.iThings.Message.Message;

@Service
public class LogoutService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public Logout logoutUser(Logout loginDetails) {
		System.out.println("ss--" + loginDetails.getPassword());

		Logout logout = new Logout();
		Message msg = new Message();
		String sqlnew = "SELECT * FROM Login WHERE UserId=? and Status='active'";
		List<Map<String, Object>> rowsnew = jdbcTemplate.queryForList(sqlnew, loginDetails.getUserName());
		if (rowsnew.size() > 0) {
			
			msg.setErrorMessage("Instance Already Generated");
			logout.setMessage(msg);
			
		}
		else
		{
		String sql = "SELECT  username,password from Login  where username=? and password=?";
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, loginDetails.getUserName(),
				loginDetails.getPassword());
		if (rows.size() > 0) {

			for (Map<String, Object> row : rows) {

				logout.setUserName((String) row.get("username"));
				logout.setTime(12);

				
				msg.setSuccessMessage("Successfully logged in");
				String logouttime = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
				
				String logoutsql = "update Login set logout_time = ? where username = ?";
				int insertlogout=jdbcTemplate.update(logoutsql,logouttime);

				logout.setMessage(msg);
				logout.setTime(logouttime);

			}

		} else {
			
			msg.setErrorMessage("Not Successfully logged in");
			logout.setMessage(msg);

		}
		}
		return logout;
	}

}

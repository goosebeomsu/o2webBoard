package o2.o2web.jdbctest;

import org.junit.jupiter.api.Test;

import java.sql.*;

public class JdbcTest {

    @Test
    public void testConnection() throws ClassNotFoundException, SQLException {
        Connection connection = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        Class.forName("oracle.jdbc.driver.OracleDriver");
        System.out.println("연결확인");

        connection = DriverManager.getConnection("jdbc:oracle:thin:@222.99.52.196:10001/ORCL", "BASIC_PROJECT_DB", "BASIC_PROJECT_DB");
        String query = "select USR_ID, USR_NM, USR_PW from GM_USR_INF";
        pstmt = connection.prepareStatement(query);

        rs = pstmt.executeQuery();

        while (rs.next()) {
            String userId = rs.getString("USR_ID");
            String userName = rs.getString("USR_NM");
            String userPw = rs.getString("USR_PW");
            System.out.println("USR_ID = " + userId + "   USR_NM = " + userName + "   USR_PW = " + userPw);
        }

        rs.close();
        pstmt.close();
        connection.close();
    }
}

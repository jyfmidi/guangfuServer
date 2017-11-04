import model.City;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;


@WebServlet("/QueryServlet")
public class QueryServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String dctjl = request.getParameter("dctjl");
        String gfbxx = request.getParameter("gfbxx");
        String zzfs = request.getParameter("zzfs");
        String qgys = request.getParameter("qgys");
        String name = request.getParameter("name");
        String data = "";
        String tableId = gfbxx + zzfs + qgys;
        int number = Integer.parseInt(dctjl);
        try {
            if(name == null) {
                data = utility.utility.getNCityJson(tableId, number);
            } else {
                data =utility.utility.getNearCityJson(tableId,name);
            }
            response.setContentType("text/html;charset=gb2312");
            PrintWriter out = response.getWriter();
            out.println(data);
            out.flush();
            out.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className="jumbotron">
        <h1>Valentine Boys and Girls Club</h1>
        <div>
            <img style={{ height: "400px" }} className="home-page-img" src="https://pbs.twimg.com/media/FKhqe2GXMAMpUKT?format=png" />
            <img className="home-page-img" src="https://bgcc.org/wp-content/uploads/2021/08/DSC_0564-445x340.jpg" />
            <img className="home-page-img" src="https://bgcc.org/wp-content/uploads/2021/08/Group-with-Ron-Kittle-453x340.jpg" />
            <img className="home-page-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST2oOD4CUHhEpTXnW6pmwoelA23MkqDvdcww&usqp=CAU" />
            <img className="home-page-img" src="https://cdn.2kgames.com/2020/03/16/5e7010dd56785valentine_first_carousel.jpg" style={{ height: "500px" }} />
            <img className="home-page-img" src="https://images.squarespace-cdn.com/content/v1/5ab2cd07297114a23a0399da/1527230587942-TAHN89R7E4LTJJP15FSN/Screen+Shot+2018-05-25+at+1.35.44+AM.png" style={{ height: "500px" }} />
        </div>
        <Link to="about" className="btn btn-primary btn-lg">
            Learn More
        </Link>

    </div>
);

export default HomePage;
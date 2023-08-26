import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import './helper.css'

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
    
  let path: Path;
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  console.log("KEYWORD: ", keyword);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
            (isAdmin ? (
                path = {
                    hash: keyword,
                    pathname: "/admin/productslist/",
                    search: `?keyword=${keyword}&page=${x+1}`,
                  }
            ):(
                path = {
                    hash: keyword,
                    pathname: "/",
                    search: `?keyword=${keyword}&page=${x+1}`,
                  }
            ))
           
          
          return (
            <div className="ball">
              <Link  key={x + 1} to={path}>
                <div className={`${(x+1 === page) ? 'activelink ':''}linkButton`}  >
                  {x + 1}
                </div>
              </Link>
            </div>
          );
        })}
      </Pagination>
    )
  );
}

export default Paginate;

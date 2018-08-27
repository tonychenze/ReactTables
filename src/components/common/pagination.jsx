import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageItemClicked } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(i => (
          <li
            key={i}
            className={currentPage === i ? "page-item active" : "page-item"}
            onClick={() => onPageItemClicked(i)}
          >
            <a className="page-link">{i}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageItemClicked: PropTypes.func.isRequired
};
export default Pagination;
// class Pagination extends Component {
//   state = {};
//   getPageNumbers = () => {
//     const { itemsCount, pageSize } = this.props;
//     const pageNumber = Math.round(itemsCount / pageSize);
//     let numArray = [];
//     for (let i = 0; i < pageNumber; i++) {
//       numArray.push(i + 1);
//     }
//     return numArray.map(i => (
//       <li
//         className="page-item"
//         key={i}
//         onClick={() => this.props.onPageItemClicked(i)}
//       >
//         <a className="page-link" href="#">
//           {i}
//         </a>
//       </li>
//     ));
//   };
//   render() {
//     return (
//       <div className="text-center">
//         <ul className="pagination">{this.getPageNumbers()}</ul>
//       </div>
//     );
//   }
// }

// export default Pagination;

import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagelinks: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pagelinks.push(i);
  }

  const maxPage = pagelinks[pagelinks.length - 1];

  const onPrevLinkClick = () => {
    if (currentPage <= 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const onNextLinkClick = () => {
    if (currentPage >= maxPage) {
      return;
    }

    onPageChange(currentPage + 1);
  };

  const isFirstPageSelected = currentPage === 1;
  const isLastPageSelected = currentPage === maxPage;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: isFirstPageSelected })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageSelected}
          onClick={onPrevLinkClick}
        >
          «
        </a>
      </li>
      {pagelinks.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames('page-item', { disabled: isLastPageSelected })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageSelected}
          onClick={onNextLinkClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

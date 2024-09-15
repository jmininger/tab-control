import PropTypes from 'prop-types';

// TabItem.jsx

function TabItem({ tab }) {
  return (
    <li className="tab-item">
      {tab.favIconUrl && (
        <img
          src={tab.favIconUrl}
          alt=""
          width="16"
          height="16"
          className="tab-favicon"
        />
      )}
      <span className="tab-title">{tab.title}</span>
    </li>
  );
}

TabItem.propTypes = {
  tab: PropTypes.shape({
    favIconUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TabItem;

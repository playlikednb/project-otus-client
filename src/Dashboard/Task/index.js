import PropTypes from "prop-types";
import "./styles.css";

const ENUM_VALUE = {
  LOW: "LOW",
  NORMAL: "NORMAL",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
};

const Task = ({ data, users }) => {
  const { assignment, body, created, owner, title, value, _id } = data;
  const dateCreated = new Date(created).toLocaleDateString("ru-RU");

  const assignmentPics = assignment.map((id) => {
    const userInfo = users.find(({ _id }) => _id === id);
    return userInfo.picture;
  });

  const ownerData = users.find(({ _id }) => _id === owner);

  console.log(ownerData);
  return (
    <div className={`Task Task_${ENUM_VALUE[value]}`}>
      <h3 className="Task__title">{title}</h3>
      <div className="Task__textShort">{body}</div>
      <div className="Task__footer">
        <div className="Task__footerInfo">
          <div className="Task__owner">
            {ownerData.firstname} {ownerData.lastname}
          </div>
          <div className="Task__date">{dateCreated}</div>
        </div>
        <div className="Task__assignment">
          {assignmentPics.map(
            (url) =>
              console.log(url) || (
                <div className="Task__assignmentPic">
                  <img src={url} width="24" height="24" />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    assignment: PropTypes.array,
    body: PropTypes.string,
    created: PropTypes.string,
    owner: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
  }),
};

export default Task;

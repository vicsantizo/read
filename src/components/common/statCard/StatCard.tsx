import './statCard.css';

type StatCardProps = {
  title: string;
  text: string;
};

export const StatCard = ({ title, text }: StatCardProps) => {
  return (
    <div className="statcard statcard--dark">
      <h2 className="statcard__title statcard__title--dark">{title}</h2>
      <p className="statcard__text statcard__text--dark">{text || 'N/A'}</p>
    </div>
  );
};

export default StatCard;

import classNames from "classnames";
import { FC, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export interface RatingProps {
  id: number;
  rate: number;
  onClick: (id: number, rating: number) => void;
}

export const Rating: FC<RatingProps> = ({ id, onClick, rate }) => {
  const [rating, setRating] = useState<number>(rate);

  const onMouseEnter = (limiter: number) => {
    setRating(limiter);
  };

  const onMouseLeave = () => {
    setRating(rate);
  };

  return (
    <div className={"flex flex-row"}>
      <Rate
        id={id}
        limiter={0}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        rate={rating}
      />
      <Rate
        id={id}
        limiter={1}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        rate={rating}
      />
      <Rate
        id={id}
        limiter={2}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        rate={rating}
      />
      <Rate
        id={id}
        limiter={3}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        rate={rating}
      />
      <Rate
        id={id}
        limiter={4}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        rate={rating}
      />
      <Rate
        id={id}
        limiter={5}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        rate={rating}
      />
    </div>
  );
};

export interface RateProps {
  id: number;
  limiter: number;
  onClick: (id: number, rating: number) => void;
  onMouseEnter: (limiter: number) => void;
  onMouseLeave: () => void;
  rate: number;
}

export const Rate: FC<RateProps> = ({
  id,
  limiter,
  onClick,
  onMouseEnter,
  onMouseLeave,
  rate,
}) => {
  const [isHover, setIsHover] = useState(false);

  const onHover = () => {
    setIsHover(true);
    onMouseEnter(limiter);
  };

  const onUnhover = () => {
    setIsHover(false);
    onMouseLeave();
  };

  return (
    <div
      className={classNames(
        "transition-transform duration-150",
        isHover ? "scale-125" : "scale-100",
        limiter == 0 ? "text-transparent" : ""
      )}
      onMouseEnter={(_) => onHover()}
      onMouseLeave={(_) => onUnhover()}
      onClick={() => onClick(id, limiter)}
    >
      {rate >= limiter ? (
        <AiFillStar
          className={classNames("w-6 h-6 transition-opacity duration-100")}
        />
      ) : (
        <AiOutlineStar className={classNames("w-6 h-6")} />
      )}
    </div>
  );
};

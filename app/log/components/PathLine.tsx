import { Polyline } from "react-kakao-maps-sdk";
import { Position } from "../Log.types";

interface PathLineProps {
  path: Position[];
  onCreate: (param: kakao.maps.Polyline) => void;
}

const PathLine = ({ path, onCreate }: PathLineProps) => {
  return (
    <Polyline
      path={path}
      strokeColor="#ff7f50"
      strokeStyle="solid"
      strokeWeight={8}
      strokeOpacity={0.6}
      onCreate={onCreate}
    />
  );
};

export default PathLine;

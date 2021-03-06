import SvgIcon from "@material-ui/core/SvgIcon";

export default function IconWrapper(props) {
    return (
      <SvgIcon {...props}>
          {props.img}
      </SvgIcon>
    );
}
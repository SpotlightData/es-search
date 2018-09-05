export default {
  container: {
    height: "50px",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
    display: "flex",
    alignItems: "flex-end"
  },
  bar: {
    background: "rgba(156,162,153,0.5)",
    flex: 1,
    "&.out-of-bounds": {
      background: "rgba(156,162,153,0.3)"
    }
  }
};

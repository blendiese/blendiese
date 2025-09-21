const convertParameter = (parameter: Parameter) => {
  const timeNow = new Date();
  let pointInTime: string;

  if (parameter.timeSelect.mode === "relative") {
    switch (parameter.timeSelect.since) {
      case "1 week":
        pointInTime = new Date(timeNow.getTime() - 1000 * 60 * 60 * 24 * 7);
        break;
      case "2 weeks":
        pointInTime = new Date(timeNow.getTime() - 1000 * 60 * 60 * 24 * 7 * 2);
        break;
      case "1 month":
        pointInTime = new Date(
          timeNow.getFullYear(),
          timeNow.getMonth() - 1,
          timeNow.getDate(),
        );
        break;
      case "2 months":
        pointInTime = new Date(
          timeNow.getFullYear(),
          timeNow.getMonth() - 2,
          timeNow.getDate(),
        );
        break;
      case "3 months":
        pointInTime = new Date(
          timeNow.getFullYear(),
          timeNow.getMonth() - 3,
          timeNow.getDate(),
        );
        break;
      case "6 months":
        pointInTime = new Date(
          timeNow.getFullYear(),
          timeNow.getMonth() - 6,
          timeNow.getDate(),
        );
        break;
      case "1 year":
        pointInTime = new Date(
          timeNow.getFullYear() - 1,
          timeNow.getMonth(),
          timeNow.getDate(),
        );
        break;
      case "custom":
        pointInTime = new Date(timeNow.getTime() - 1000 * 60 * 60 * 24 * 7);
        break;
    }
  }
};

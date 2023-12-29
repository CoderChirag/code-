import css from "./sidebar.module.css";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

import Menubar from "@/components/menubar/menubar";
import Actionbar from "@/components/actionbar/actionbar";

const actionItems = [
  {
    id: "explorer",
    label: "Explorer",
    icon: <FileCopyOutlinedIcon />,
    action: () => {},
  },
];

export default function Sidebar() {
  return (
    <aside className={css.sidebar}>
      <Menubar />
      <Actionbar actionItems={actionItems} activeActionItem="explorer" />
    </aside>
  );
}

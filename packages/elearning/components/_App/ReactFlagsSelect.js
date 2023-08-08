import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const ReactFlags = () => {
  const [selected, setSelected] = useState("");

  <ReactFlagsSelect
    selected={selected}
    onSelect={(code) => setSelected(code)}
  />;
};

export default ReactFlags;
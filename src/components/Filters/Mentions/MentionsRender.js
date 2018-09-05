import React, { Component } from "react";
import sid from "shortid";

import { EntityFilter } from "../EntityFilter";

export const MentionsRender = entities => {
  // Map key to - entity, title
  return (
    <React.Fragment>
      {entities.map(({ key }) => (
        <EntityFilter key={sid.generate()} title={key} entity={key} />
      ))}
    </React.Fragment>
  );
};

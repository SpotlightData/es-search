import React, { PureComponent } from "react";
import { shape, string } from "prop-types";

import { Checkbox, Row, Col } from "antd";
import { Badge } from "@spotlightdata/nanowire-extensions/lib/components/antd/Badge";
import { RefinementListFilter, FastClick } from "searchkit";
import { RefinementAccessor } from "./Accessor";

import sid from "shortid";

const style = { color: "#108ee9", cursor: "pointer" };
const badgeStyle = { backgroundColor: "#1890ff" };
/*
  Required props
  entity = the @type of the entity we want to filter by
*/
export class EntityRefinementListFilter extends PureComponent {
  static propTypes = {
    accessor: shape({}).isRequired,
    title: string.isRequired
  };

  render() {
    return null;
  }
}
// export class EntityRefinementListFilter extends RefinementListFilter {
//   static defaultProps = {
//     size: 5,
//     field: "jsonLD.mentions.name.keyword",
//     operator: "AND",
//     fieldOptions: {
//       type: "nested",
//       options: {
//         path: "jsonLD.mentions"
//       }
//     },
//     collapsable: true,
//     bucketsTransform: a => a,
//     showMore: true
//   };

//   toggleFilter = key => _changed => {
//     this.accessor.state = this.accessor.state.cycle(key);
//     this.searchkit.performSearch();
//   };

//   defineAccessor() {
//     const accessorOptions = Object.assign(this.getAccessorOptions(), {
//       entity: this.props.entity,
//       filterName: `${this.props.entity}Filter`,
//       actualField: this.props.field
//     });
//     return new RefinementAccessor(
//       this.props.field + this.props.entity,
//       accessorOptions
//     );
//   }

//   renderShowMore() {
//     const optionMore = this.accessor.getMoreSizeOption();
//     const optionLess = this.accessor.getLessSizeOption();

//     if (!optionMore && !optionLess) {
//       return null;
//     }

//     return (
//       <div key="showMoreLess">
//         {optionMore && (
//           <FastClick
//             handler={() => this.toggleViewMoreOption(optionMore)}
//             key="showMore"
//           >
//             <div style={style}>{this.translate(optionMore.label)}</div>
//           </FastClick>
//         )}
//         {optionLess && (
//           <FastClick
//             handler={() => this.toggleViewMoreOption(optionLess)}
//             key="showLess"
//           >
//             <div style={style}>{this.translate(optionLess.label)}</div>
//           </FastClick>
//         )}
//       </div>
//     );
//   }

//   isSelected(key) {
//     return this.getSelectedItems()[key] === "1";
//   }

//   render() {
//     const showMore = this.renderShowMore();
//     const rows = this.getItems();
//     return (
//       <React.Fragment>
//         {rows.map(({ key, doc_count }) => (
//           <Row key={sid.generate()} type="flex" justify="space-between">
//             <Checkbox
//               onChange={this.toggleFilter(key)}
//               checked={this.isSelected(key)}
//             >
//               {key}
//             </Checkbox>
//             <Badge count={doc_count} style={badgeStyle} />
//           </Row>
//         ))}
//         <Row>{showMore}</Row>
//       </React.Fragment>
//     );
//   }
// }

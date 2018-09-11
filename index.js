const ActiveFiltersDisplay = require("./build/ActiveFiltersDisplay").default;
const ClearFiltersDisplay = require("./build/ClearFiltersDisplay").default;
const DateFilter = require("./build/DateFilter").default;
const MentionsFilter = require("./build/MentionsFilter").default;
const Pagination = require("./build/Pagination").default;
const ExposeQuery = require("./build/ExposeQuery").default;
const Sorter = require("./build/Sorter").default;

const { SearchFilter, Search } = require("./build/Search");
const SearchkitProvider = require("./build/SearchkitProvider").default;

const modules = {
  ActiveFiltersDisplay,
  ClearFiltersDisplay,
  DateFilter,
  MentionsFilter,
  Pagination,
  SearchFilter,
  Search,
  SearchkitProvider,
  ExposeQuery,
  Sorter
};

module.exports = modules;

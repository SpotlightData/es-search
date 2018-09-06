const ActiveFiltersDisplay = require("./build/ActiveFiltersDisplay");
const ClearFiltersDisplay = require("./build/ClearFiltersDisplay");
const DateFilter = require("./build/DateFilter");
const MentionsFilter = require("./build/MentionsFilter");
const Pagination = require("./build/Pagination");

const { SearchFilter, Search } = require("./build/Search");
const SearchkitProvider = require("./build/SearchkitProvider");

const modules = {
  ActiveFiltersDisplay,
  ClearFiltersDisplay,
  DateFilter,
  MentionsFilter,
  Pagination,
  SearchFilter,
  Search,
  SearchkitProvider
};
module.exports = modules;

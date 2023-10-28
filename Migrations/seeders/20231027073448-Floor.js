'use strict';

const floorData = [
  { buildingId: 1, roomNumber: 101, floorNumber: 1 },
  { buildingId: 1, roomNumber: 102, floorNumber: 1 },
  { buildingId: 1, roomNumber: 103, floorNumber: 1 },
  { buildingId: 1, roomNumber: 104, floorNumber: 1 },
  { buildingId: 1, roomNumber: 105, floorNumber: 1 },
  { buildingId: 1, roomNumber: 106, floorNumber: 1 },
  { buildingId: 1, roomNumber: 107, floorNumber: 1 },
  { buildingId: 1, roomNumber: 108, floorNumber: 1 },

  { buildingId: 1, roomNumber: 201, floorNumber: 2 },
  { buildingId: 1, roomNumber: 202, floorNumber: 2 },
  { buildingId: 1, roomNumber: 203, floorNumber: 2 },
  { buildingId: 1, roomNumber: 204, floorNumber: 2 },
  { buildingId: 1, roomNumber: 205, floorNumber: 2 },
  { buildingId: 1, roomNumber: 206, floorNumber: 2 },
  { buildingId: 1, roomNumber: 207, floorNumber: 2 },
  { buildingId: 1, roomNumber: 208, floorNumber: 2 },

  { buildingId: 1, roomNumber: 301, floorNumber: 3 },
  { buildingId: 1, roomNumber: 302, floorNumber: 3 },
  { buildingId: 1, roomNumber: 303, floorNumber: 3 },
  { buildingId: 1, roomNumber: 304, floorNumber: 3 },
  { buildingId: 1, roomNumber: 305, floorNumber: 3 },
  { buildingId: 1, roomNumber: 306, floorNumber: 3 },
  { buildingId: 1, roomNumber: 307, floorNumber: 3 },
  { buildingId: 1, roomNumber: 308, floorNumber: 3 },

  { buildingId: 1, roomNumber: 401, floorNumber: 4 },
  { buildingId: 1, roomNumber: 402, floorNumber: 4 },
  { buildingId: 1, roomNumber: 403, floorNumber: 4 },
  { buildingId: 1, roomNumber: 404, floorNumber: 4 },
  { buildingId: 1, roomNumber: 405, floorNumber: 4 },
  { buildingId: 1, roomNumber: 406, floorNumber: 4 },
  { buildingId: 1, roomNumber: 407, floorNumber: 4 },
  { buildingId: 1, roomNumber: 408, floorNumber: 4 },

  { buildingId: 1, roomNumber: 501, floorNumber: 5 },
  { buildingId: 1, roomNumber: 502, floorNumber: 5 },
  { buildingId: 1, roomNumber: 503, floorNumber: 5 },
  { buildingId: 1, roomNumber: 504, floorNumber: 5 },
  { buildingId: 1, roomNumber: 505, floorNumber: 5 },
  { buildingId: 1, roomNumber: 506, floorNumber: 5 },
  { buildingId: 1, roomNumber: 507, floorNumber: 5 },
  { buildingId: 1, roomNumber: 508, floorNumber: 5 },

  { buildingId: 1, roomNumber: 601, floorNumber: 6 },
  { buildingId: 1, roomNumber: 602, floorNumber: 6 },
  { buildingId: 1, roomNumber: 603, floorNumber: 6 },
  { buildingId: 1, roomNumber: 604, floorNumber: 6 },
  { buildingId: 1, roomNumber: 605, floorNumber: 6 },
  { buildingId: 1, roomNumber: 606, floorNumber: 6 },
  { buildingId: 1, roomNumber: 607, floorNumber: 6 },
  { buildingId: 1, roomNumber: 608, floorNumber: 6 },

  { buildingId: 1, roomNumber: 701, floorNumber: 7 },
  { buildingId: 1, roomNumber: 702, floorNumber: 7 },
  { buildingId: 1, roomNumber: 703, floorNumber: 7 },
  { buildingId: 1, roomNumber: 704, floorNumber: 7 },
  { buildingId: 1, roomNumber: 705, floorNumber: 7 },
  { buildingId: 1, roomNumber: 706, floorNumber: 7 },
  { buildingId: 1, roomNumber: 707, floorNumber: 7 },
  { buildingId: 1, roomNumber: 708, floorNumber: 7 },

  { buildingId: 1, roomNumber: 801, floorNumber: 8 },
  { buildingId: 1, roomNumber: 802, floorNumber: 8 },
  { buildingId: 1, roomNumber: 803, floorNumber: 8 },
  { buildingId: 1, roomNumber: 804, floorNumber: 8 },
  { buildingId: 1, roomNumber: 805, floorNumber: 8 },
  { buildingId: 1, roomNumber: 806, floorNumber: 8 },
  { buildingId: 1, roomNumber: 807, floorNumber: 8 },
  { buildingId: 1, roomNumber: 808, floorNumber: 8 },

  { buildingId: 1, roomNumber: 901, floorNumber: 9 },
  { buildingId: 1, roomNumber: 902, floorNumber: 9 },
  { buildingId: 1, roomNumber: 903, floorNumber: 9 },
  { buildingId: 1, roomNumber: 904, floorNumber: 9 },
  { buildingId: 1, roomNumber: 905, floorNumber: 9 },
  { buildingId: 1, roomNumber: 906, floorNumber: 9 },
  { buildingId: 1, roomNumber: 907, floorNumber: 9 },
  { buildingId: 1, roomNumber: 908, floorNumber: 9 },

  { buildingId: 1, roomNumber: 1001, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1002, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1003, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1004, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1005, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1006, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1007, floorNumber: 10 },
  { buildingId: 1, roomNumber: 1008, floorNumber: 10 },

  { buildingId: 1, roomNumber: 1101, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1102, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1103, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1104, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1105, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1106, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1107, floorNumber: 11 },
  { buildingId: 1, roomNumber: 1108, floorNumber: 11 },

  { buildingId: 1, roomNumber: 1201, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1202, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1203, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1204, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1205, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1206, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1207, floorNumber: 12 },
  { buildingId: 1, roomNumber: 1208, floorNumber: 12 },

  { buildingId: 1, roomNumber: 1301, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1302, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1303, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1304, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1305, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1306, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1307, floorNumber: 13 },
  { buildingId: 1, roomNumber: 1308, floorNumber: 13 },

  { buildingId: 1, roomNumber: 1401, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1402, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1403, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1404, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1405, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1406, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1407, floorNumber: 14 },
  { buildingId: 1, roomNumber: 1408, floorNumber: 14 },

  { buildingId: 1, roomNumber: 1501, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1502, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1503, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1504, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1505, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1506, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1507, floorNumber: 15 },
  { buildingId: 1, roomNumber: 1508, floorNumber: 15 },

  { buildingId: 2, roomNumber: 101, floorNumber: 1 },
  { buildingId: 2, roomNumber: 102, floorNumber: 1 },
  { buildingId: 2, roomNumber: 103, floorNumber: 1 },
  { buildingId: 2, roomNumber: 104, floorNumber: 1 },
  { buildingId: 2, roomNumber: 105, floorNumber: 1 },
  { buildingId: 2, roomNumber: 106, floorNumber: 1 },
  { buildingId: 2, roomNumber: 107, floorNumber: 1 },
  { buildingId: 2, roomNumber: 108, floorNumber: 1 },

  { buildingId: 2, roomNumber: 201, floorNumber: 2 },
  { buildingId: 2, roomNumber: 202, floorNumber: 2 },
  { buildingId: 2, roomNumber: 203, floorNumber: 2 },
  { buildingId: 2, roomNumber: 204, floorNumber: 2 },
  { buildingId: 2, roomNumber: 205, floorNumber: 2 },
  { buildingId: 2, roomNumber: 206, floorNumber: 2 },
  { buildingId: 2, roomNumber: 207, floorNumber: 2 },
  { buildingId: 2, roomNumber: 208, floorNumber: 2 },

  { buildingId: 2, roomNumber: 301, floorNumber: 3 },
  { buildingId: 2, roomNumber: 302, floorNumber: 3 },
  { buildingId: 2, roomNumber: 303, floorNumber: 3 },
  { buildingId: 2, roomNumber: 304, floorNumber: 3 },
  { buildingId: 2, roomNumber: 305, floorNumber: 3 },
  { buildingId: 2, roomNumber: 306, floorNumber: 3 },
  { buildingId: 2, roomNumber: 307, floorNumber: 3 },
  { buildingId: 2, roomNumber: 308, floorNumber: 3 },

  { buildingId: 2, roomNumber: 401, floorNumber: 4 },
  { buildingId: 2, roomNumber: 402, floorNumber: 4 },
  { buildingId: 2, roomNumber: 403, floorNumber: 4 },
  { buildingId: 2, roomNumber: 404, floorNumber: 4 },
  { buildingId: 2, roomNumber: 405, floorNumber: 4 },
  { buildingId: 2, roomNumber: 406, floorNumber: 4 },
  { buildingId: 2, roomNumber: 407, floorNumber: 4 },
  { buildingId: 2, roomNumber: 408, floorNumber: 4 },

  { buildingId: 2, roomNumber: 501, floorNumber: 5 },
  { buildingId: 2, roomNumber: 502, floorNumber: 5 },
  { buildingId: 2, roomNumber: 503, floorNumber: 5 },
  { buildingId: 2, roomNumber: 504, floorNumber: 5 },
  { buildingId: 2, roomNumber: 505, floorNumber: 5 },
  { buildingId: 2, roomNumber: 506, floorNumber: 5 },
  { buildingId: 2, roomNumber: 507, floorNumber: 5 },
  { buildingId: 2, roomNumber: 508, floorNumber: 5 },

  { buildingId: 2, roomNumber: 601, floorNumber: 6 },
  { buildingId: 2, roomNumber: 602, floorNumber: 6 },
  { buildingId: 2, roomNumber: 603, floorNumber: 6 },
  { buildingId: 2, roomNumber: 604, floorNumber: 6 },
  { buildingId: 2, roomNumber: 605, floorNumber: 6 },
  { buildingId: 2, roomNumber: 606, floorNumber: 6 },
  { buildingId: 2, roomNumber: 607, floorNumber: 6 },
  { buildingId: 2, roomNumber: 608, floorNumber: 6 },

  { buildingId: 2, roomNumber: 701, floorNumber: 7 },
  { buildingId: 2, roomNumber: 702, floorNumber: 7 },
  { buildingId: 2, roomNumber: 703, floorNumber: 7 },
  { buildingId: 2, roomNumber: 704, floorNumber: 7 },
  { buildingId: 2, roomNumber: 705, floorNumber: 7 },
  { buildingId: 2, roomNumber: 706, floorNumber: 7 },
  { buildingId: 2, roomNumber: 707, floorNumber: 7 },
  { buildingId: 2, roomNumber: 708, floorNumber: 7 },

  { buildingId: 2, roomNumber: 801, floorNumber: 8 },
  { buildingId: 2, roomNumber: 802, floorNumber: 8 },
  { buildingId: 2, roomNumber: 803, floorNumber: 8 },
  { buildingId: 2, roomNumber: 804, floorNumber: 8 },
  { buildingId: 2, roomNumber: 805, floorNumber: 8 },
  { buildingId: 2, roomNumber: 806, floorNumber: 8 },
  { buildingId: 2, roomNumber: 807, floorNumber: 8 },
  { buildingId: 2, roomNumber: 808, floorNumber: 8 },

  { buildingId: 2, roomNumber: 901, floorNumber: 9 },
  { buildingId: 2, roomNumber: 902, floorNumber: 9 },
  { buildingId: 2, roomNumber: 903, floorNumber: 9 },
  { buildingId: 2, roomNumber: 904, floorNumber: 9 },
  { buildingId: 2, roomNumber: 905, floorNumber: 9 },
  { buildingId: 2, roomNumber: 906, floorNumber: 9 },
  { buildingId: 2, roomNumber: 907, floorNumber: 9 },
  { buildingId: 2, roomNumber: 908, floorNumber: 9 },

  { buildingId: 2, roomNumber: 1001, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1002, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1003, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1004, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1005, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1006, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1007, floorNumber: 10 },
  { buildingId: 2, roomNumber: 1008, floorNumber: 10 },

  { buildingId: 2, roomNumber: 1101, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1102, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1103, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1104, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1105, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1106, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1107, floorNumber: 11 },
  { buildingId: 2, roomNumber: 1108, floorNumber: 11 },

  { buildingId: 2, roomNumber: 1201, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1202, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1203, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1204, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1205, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1206, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1207, floorNumber: 12 },
  { buildingId: 2, roomNumber: 1208, floorNumber: 12 },

  { buildingId: 2, roomNumber: 1301, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1302, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1303, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1304, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1305, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1306, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1307, floorNumber: 13 },
  { buildingId: 2, roomNumber: 1308, floorNumber: 13 },

  { buildingId: 2, roomNumber: 1401, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1402, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1403, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1404, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1405, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1406, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1407, floorNumber: 14 },
  { buildingId: 2, roomNumber: 1408, floorNumber: 14 },

  { buildingId: 2, roomNumber: 1501, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1502, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1503, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1504, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1505, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1506, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1507, floorNumber: 15 },
  { buildingId: 2, roomNumber: 1508, floorNumber: 15 },

  { buildingId: 3, roomNumber: 101, floorNumber: 1 },
  { buildingId: 3, roomNumber: 102, floorNumber: 1 },
  { buildingId: 3, roomNumber: 103, floorNumber: 1 },
  { buildingId: 3, roomNumber: 104, floorNumber: 1 },
  { buildingId: 3, roomNumber: 105, floorNumber: 1 },
  { buildingId: 3, roomNumber: 106, floorNumber: 1 },
  { buildingId: 3, roomNumber: 107, floorNumber: 1 },
  { buildingId: 3, roomNumber: 108, floorNumber: 1 },

  { buildingId: 3, roomNumber: 201, floorNumber: 2 },
  { buildingId: 3, roomNumber: 202, floorNumber: 2 },
  { buildingId: 3, roomNumber: 203, floorNumber: 2 },
  { buildingId: 3, roomNumber: 204, floorNumber: 2 },
  { buildingId: 3, roomNumber: 205, floorNumber: 2 },
  { buildingId: 3, roomNumber: 206, floorNumber: 2 },
  { buildingId: 3, roomNumber: 207, floorNumber: 2 },
  { buildingId: 3, roomNumber: 208, floorNumber: 2 },

  { buildingId: 3, roomNumber: 301, floorNumber: 3 },
  { buildingId: 3, roomNumber: 302, floorNumber: 3 },
  { buildingId: 3, roomNumber: 303, floorNumber: 3 },
  { buildingId: 3, roomNumber: 304, floorNumber: 3 },
  { buildingId: 3, roomNumber: 305, floorNumber: 3 },
  { buildingId: 3, roomNumber: 306, floorNumber: 3 },
  { buildingId: 3, roomNumber: 307, floorNumber: 3 },
  { buildingId: 3, roomNumber: 308, floorNumber: 3 },

  { buildingId: 3, roomNumber: 401, floorNumber: 4 },
  { buildingId: 3, roomNumber: 402, floorNumber: 4 },
  { buildingId: 3, roomNumber: 403, floorNumber: 4 },
  { buildingId: 3, roomNumber: 404, floorNumber: 4 },
  { buildingId: 3, roomNumber: 405, floorNumber: 4 },
  { buildingId: 3, roomNumber: 406, floorNumber: 4 },
  { buildingId: 3, roomNumber: 407, floorNumber: 4 },
  { buildingId: 3, roomNumber: 408, floorNumber: 4 },

  { buildingId: 3, roomNumber: 501, floorNumber: 5 },
  { buildingId: 3, roomNumber: 502, floorNumber: 5 },
  { buildingId: 3, roomNumber: 503, floorNumber: 5 },
  { buildingId: 3, roomNumber: 504, floorNumber: 5 },
  { buildingId: 3, roomNumber: 505, floorNumber: 5 },
  { buildingId: 3, roomNumber: 506, floorNumber: 5 },
  { buildingId: 3, roomNumber: 507, floorNumber: 5 },
  { buildingId: 3, roomNumber: 508, floorNumber: 5 },

  { buildingId: 3, roomNumber: 601, floorNumber: 6 },
  { buildingId: 3, roomNumber: 602, floorNumber: 6 },
  { buildingId: 3, roomNumber: 603, floorNumber: 6 },
  { buildingId: 3, roomNumber: 604, floorNumber: 6 },
  { buildingId: 3, roomNumber: 605, floorNumber: 6 },
  { buildingId: 3, roomNumber: 606, floorNumber: 6 },
  { buildingId: 3, roomNumber: 607, floorNumber: 6 },
  { buildingId: 3, roomNumber: 608, floorNumber: 6 },

  { buildingId: 3, roomNumber: 701, floorNumber: 7 },
  { buildingId: 3, roomNumber: 702, floorNumber: 7 },
  { buildingId: 3, roomNumber: 703, floorNumber: 7 },
  { buildingId: 3, roomNumber: 704, floorNumber: 7 },
  { buildingId: 3, roomNumber: 705, floorNumber: 7 },
  { buildingId: 3, roomNumber: 706, floorNumber: 7 },
  { buildingId: 3, roomNumber: 707, floorNumber: 7 },
  { buildingId: 3, roomNumber: 708, floorNumber: 7 },

  { buildingId: 3, roomNumber: 801, floorNumber: 8 },
  { buildingId: 3, roomNumber: 802, floorNumber: 8 },
  { buildingId: 3, roomNumber: 803, floorNumber: 8 },
  { buildingId: 3, roomNumber: 804, floorNumber: 8 },
  { buildingId: 3, roomNumber: 805, floorNumber: 8 },
  { buildingId: 3, roomNumber: 806, floorNumber: 8 },
  { buildingId: 3, roomNumber: 807, floorNumber: 8 },
  { buildingId: 3, roomNumber: 808, floorNumber: 8 },

  { buildingId: 3, roomNumber: 901, floorNumber: 9 },
  { buildingId: 3, roomNumber: 902, floorNumber: 9 },
  { buildingId: 3, roomNumber: 903, floorNumber: 9 },
  { buildingId: 3, roomNumber: 904, floorNumber: 9 },
  { buildingId: 3, roomNumber: 905, floorNumber: 9 },
  { buildingId: 3, roomNumber: 906, floorNumber: 9 },
  { buildingId: 3, roomNumber: 907, floorNumber: 9 },
  { buildingId: 3, roomNumber: 908, floorNumber: 9 },

  { buildingId: 3, roomNumber: 1001, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1002, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1003, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1004, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1005, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1006, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1007, floorNumber: 10 },
  { buildingId: 3, roomNumber: 1008, floorNumber: 10 },

  { buildingId: 3, roomNumber: 1101, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1102, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1103, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1104, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1105, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1106, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1107, floorNumber: 11 },
  { buildingId: 3, roomNumber: 1108, floorNumber: 11 },

  { buildingId: 3, roomNumber: 1201, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1202, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1203, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1204, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1205, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1206, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1207, floorNumber: 12 },
  { buildingId: 3, roomNumber: 1208, floorNumber: 12 },

  { buildingId: 3, roomNumber: 1301, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1302, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1303, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1304, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1305, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1306, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1307, floorNumber: 13 },
  { buildingId: 3, roomNumber: 1308, floorNumber: 13 },

  { buildingId: 3, roomNumber: 1401, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1402, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1403, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1404, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1405, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1406, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1407, floorNumber: 14 },
  { buildingId: 3, roomNumber: 1408, floorNumber: 14 },

  { buildingId: 3, roomNumber: 1501, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1502, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1503, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1504, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1505, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1506, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1507, floorNumber: 15 },
  { buildingId: 3, roomNumber: 1508, floorNumber: 15 },

  { buildingId: 4, roomNumber: 101, floorNumber: 1 },
  { buildingId: 4, roomNumber: 102, floorNumber: 1 },
  { buildingId: 4, roomNumber: 103, floorNumber: 1 },
  { buildingId: 4, roomNumber: 104, floorNumber: 1 },
  { buildingId: 4, roomNumber: 105, floorNumber: 1 },
  { buildingId: 4, roomNumber: 106, floorNumber: 1 },
  { buildingId: 4, roomNumber: 107, floorNumber: 1 },
  { buildingId: 4, roomNumber: 108, floorNumber: 1 },

  { buildingId: 4, roomNumber: 201, floorNumber: 2 },
  { buildingId: 4, roomNumber: 202, floorNumber: 2 },
  { buildingId: 4, roomNumber: 203, floorNumber: 2 },
  { buildingId: 4, roomNumber: 204, floorNumber: 2 },
  { buildingId: 4, roomNumber: 205, floorNumber: 2 },
  { buildingId: 4, roomNumber: 206, floorNumber: 2 },
  { buildingId: 4, roomNumber: 207, floorNumber: 2 },
  { buildingId: 4, roomNumber: 208, floorNumber: 2 },

  { buildingId: 4, roomNumber: 301, floorNumber: 3 },
  { buildingId: 4, roomNumber: 302, floorNumber: 3 },
  { buildingId: 4, roomNumber: 303, floorNumber: 3 },
  { buildingId: 4, roomNumber: 304, floorNumber: 3 },
  { buildingId: 4, roomNumber: 305, floorNumber: 3 },
  { buildingId: 4, roomNumber: 306, floorNumber: 3 },
  { buildingId: 4, roomNumber: 307, floorNumber: 3 },
  { buildingId: 4, roomNumber: 308, floorNumber: 3 },

  { buildingId: 4, roomNumber: 401, floorNumber: 4 },
  { buildingId: 4, roomNumber: 402, floorNumber: 4 },
  { buildingId: 4, roomNumber: 403, floorNumber: 4 },
  { buildingId: 4, roomNumber: 404, floorNumber: 4 },
  { buildingId: 4, roomNumber: 405, floorNumber: 4 },
  { buildingId: 4, roomNumber: 406, floorNumber: 4 },
  { buildingId: 4, roomNumber: 407, floorNumber: 4 },
  { buildingId: 4, roomNumber: 408, floorNumber: 4 },

  { buildingId: 4, roomNumber: 501, floorNumber: 5 },
  { buildingId: 4, roomNumber: 502, floorNumber: 5 },
  { buildingId: 4, roomNumber: 503, floorNumber: 5 },
  { buildingId: 4, roomNumber: 504, floorNumber: 5 },
  { buildingId: 4, roomNumber: 505, floorNumber: 5 },
  { buildingId: 4, roomNumber: 506, floorNumber: 5 },
  { buildingId: 4, roomNumber: 507, floorNumber: 5 },
  { buildingId: 4, roomNumber: 508, floorNumber: 5 },

  { buildingId: 4, roomNumber: 601, floorNumber: 6 },
  { buildingId: 4, roomNumber: 602, floorNumber: 6 },
  { buildingId: 4, roomNumber: 603, floorNumber: 6 },
  { buildingId: 4, roomNumber: 604, floorNumber: 6 },
  { buildingId: 4, roomNumber: 605, floorNumber: 6 },
  { buildingId: 4, roomNumber: 606, floorNumber: 6 },
  { buildingId: 4, roomNumber: 607, floorNumber: 6 },
  { buildingId: 4, roomNumber: 608, floorNumber: 6 },

  { buildingId: 4, roomNumber: 701, floorNumber: 7 },
  { buildingId: 4, roomNumber: 702, floorNumber: 7 },
  { buildingId: 4, roomNumber: 703, floorNumber: 7 },
  { buildingId: 4, roomNumber: 704, floorNumber: 7 },
  { buildingId: 4, roomNumber: 705, floorNumber: 7 },
  { buildingId: 4, roomNumber: 706, floorNumber: 7 },
  { buildingId: 4, roomNumber: 707, floorNumber: 7 },
  { buildingId: 4, roomNumber: 708, floorNumber: 7 },

  { buildingId: 4, roomNumber: 801, floorNumber: 8 },
  { buildingId: 4, roomNumber: 802, floorNumber: 8 },
  { buildingId: 4, roomNumber: 803, floorNumber: 8 },
  { buildingId: 4, roomNumber: 804, floorNumber: 8 },
  { buildingId: 4, roomNumber: 805, floorNumber: 8 },
  { buildingId: 4, roomNumber: 806, floorNumber: 8 },
  { buildingId: 4, roomNumber: 807, floorNumber: 8 },
  { buildingId: 4, roomNumber: 808, floorNumber: 8 },

  { buildingId: 4, roomNumber: 901, floorNumber: 9 },
  { buildingId: 4, roomNumber: 902, floorNumber: 9 },
  { buildingId: 4, roomNumber: 903, floorNumber: 9 },
  { buildingId: 4, roomNumber: 904, floorNumber: 9 },
  { buildingId: 4, roomNumber: 905, floorNumber: 9 },
  { buildingId: 4, roomNumber: 906, floorNumber: 9 },
  { buildingId: 4, roomNumber: 907, floorNumber: 9 },
  { buildingId: 4, roomNumber: 908, floorNumber: 9 },

  { buildingId: 4, roomNumber: 1001, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1002, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1003, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1004, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1005, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1006, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1007, floorNumber: 10 },
  { buildingId: 4, roomNumber: 1008, floorNumber: 10 },

  { buildingId: 4, roomNumber: 1101, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1102, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1103, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1104, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1105, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1106, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1107, floorNumber: 11 },
  { buildingId: 4, roomNumber: 1108, floorNumber: 11 },

  { buildingId: 4, roomNumber: 1201, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1202, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1203, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1204, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1205, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1206, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1207, floorNumber: 12 },
  { buildingId: 4, roomNumber: 1208, floorNumber: 12 },

  { buildingId: 4, roomNumber: 1301, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1302, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1303, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1304, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1305, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1306, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1307, floorNumber: 13 },
  { buildingId: 4, roomNumber: 1308, floorNumber: 13 },

  { buildingId: 4, roomNumber: 1401, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1402, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1403, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1404, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1405, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1406, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1407, floorNumber: 14 },
  { buildingId: 4, roomNumber: 1408, floorNumber: 14 },

  { buildingId: 4, roomNumber: 1501, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1502, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1503, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1504, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1505, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1506, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1507, floorNumber: 15 },
  { buildingId: 4, roomNumber: 1508, floorNumber: 15 }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ schema: 'public', tableName: 'Floor' }, floorData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ schema: 'public', tableName: 'Floor' }, null, {});
  }
};
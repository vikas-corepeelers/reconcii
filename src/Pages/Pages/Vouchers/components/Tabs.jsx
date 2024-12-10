import React, { useEffect, useRef, useState } from "react";

import "../vouchers.style.css";

const VOUCHER_TABS = [
  { id: "created_voucher", label: "Created Voucher" },
  { id: "approved_voucher", label: "Approved Voucher" },
  { id: "pending_approval_voucher", label: "Vouchers Pending Approval" },
  { id: "rejected_voucher", label: "Rejected Vouchers" },
];

export default function VoucherTabs() {
  return <div className="">{VOUCHER_TABS?.map(tab)}</div>;
}

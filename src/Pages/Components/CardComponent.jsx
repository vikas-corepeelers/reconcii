import React from "react";
import '../Styles/CardComponent.css';

export default function CardComponent() {
  return (
    <div class="box font-Roboto">
      <div class="box-body">
        <div class="flex">
          <div>
            <p class=" font-medium mb-1 text-Text-primary">Total Orders</p>
            <h4 class="h4 mb-0 text-Text-secondary">$18,645</h4>
          </div>
          <div class="avatar avatar-lg rounded-md  ms-auto">
              <div class="avatar !h-[2.5rem] !w-[2.5rem] !mb-0 rounded-md bg-Background-dark"> 
                {/* <i class="bi bi-cart-check text-[1.2rem] !text-white"></i>  */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
              </div>
          </div>
        </div>
        <div class="flex mt-2">
          <span class="badge bg-danger/10 !text-danger !text-xs !rounded-full">
            +10% <i class="fe fe-arrow-up !text-[0.75rem]"></i>
          </span>
          <a
            href="javascript:void(0);"
            class="text-textmuted  ms-auto underline mt-auto"
          >
            view more
          </a>
        </div>
      </div>
    </div>
  );
}

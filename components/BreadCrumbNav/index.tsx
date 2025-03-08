"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Fragment } from "react";

const BreadcrumbNav = () => {
  const segments = useSelectedLayoutSegments();
  return (
    <Breadcrumb className="px-4">
      <BreadcrumbList>
        <BreadcrumbItem key="home">
          <BreadcrumbLink href="/" isActive={segments.length === 0}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => (
          <Fragment key={segment}>
            <BreadcrumbSeparator key={`${segment}-separator`}>
              <span className="text-black font-semibold">/</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem key={segment} className="relative">
              {index === segments.length - 1 && (
                <div className="absolute inset-0 bg-yellow top-[40%] -right-0.5" />
              )}
              <BreadcrumbLink
                href={`/${segment}`}
                className="z-10"
                isActive={index === segments.length - 1}
              >
                {`${segment.charAt(0).toUpperCase()}${segment.slice(1)}`}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;

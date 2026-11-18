import React from "react";
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getBreadcrumbTrail } from "../../config/routes";

const buildTrail = (pathname, project, items) => {
  if (items && items.length) return items;

  const trail = getBreadcrumbTrail(pathname);
  if (!project?.name || trail.length === 0) return trail;

  // Insert the project after Home.
  const [home, ...rest] = trail;
  return [home, { label: `Project: ${project.name}`, path: project.path }, ...rest];
};

const Breadcrumb = ({ project, items, ...rest }) => {
  const { pathname } = useLocation();
  const trail = buildTrail(pathname, project, items);

  // Unknown route (e.g. 404) – nothing to show.
  if (trail.length === 0) return null;

  return (
    <ChakraBreadcrumb
      separator={<ChevronRightIcon color="text.muted" boxSize={4} />}
      spacing={1}
      fontSize="sm"
      {...rest}
    >
      {trail.map((crumb, index) => {
        const isCurrent = index === trail.length - 1;
        return (
          <BreadcrumbItem key={`${crumb.label}-${index}`} isCurrentPage={isCurrent}>
            {isCurrent || !crumb.path ? (
              <Text
                as="span"
                aria-current={isCurrent ? "page" : undefined}
                fontWeight={isCurrent ? "bold" : "medium"}
                color="text.primary"
              >
                {crumb.label}
              </Text>
            ) : (
              <BreadcrumbLink
                as={RouterLink}
                to={crumb.path}
                fontWeight="medium"
                color="text.primary"
                _hover={{ color: "text.link", textDecoration: "underline" }}
              >
                {crumb.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </ChakraBreadcrumb>
  );
};

export default Breadcrumb;

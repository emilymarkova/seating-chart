import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HomeRounded from '@mui/icons-material/HomeRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Person from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

type Options = {
  initialActiveIndex: null | number;
  vertical: boolean;
  handlers?: {
    onKeyDown: (
      event: React.KeyboardEvent<HTMLAnchorElement>,
      fns: { setActiveIndex: React.Dispatch<React.SetStateAction<number | null>> },
    ) => void;
  };
};

const useRovingIndex = (options?: Options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {
      onKeyDown: () => {},
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    initialActiveIndex!,
  );
  const targetRefs = React.useRef<Array<HTMLAnchorElement>>([]);
  const targets = targetRefs.current;
  const focusNext = () => {
    let newIndex = activeIndex! + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const focusPrevious = () => {
    let newIndex = activeIndex! - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const getTargetProps = (index: number) => ({
    ref: (ref: HTMLAnchorElement) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (Number.isInteger(activeIndex)) {
        if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) {
          focusNext();
        }
        if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) {
          focusPrevious();
        }
        handlers.onKeyDown?.(event, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });
  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

type AboutMenuProps = {
  focusNext: () => void;
  focusPrevious: () => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

const AboutMenu = React.forwardRef(
  (
    { focusNext, focusPrevious, ...props }: AboutMenuProps,
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null);
    const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
      initialActiveIndex: null,
      vertical: true,
      handlers: {
        onKeyDown: (event, fns) => {
          if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
            event.preventDefault();
          }
          if (event.key === 'Tab') {
            setAnchorEl(null);
            fns.setActiveIndex(null);
          }
          if (event.key === 'ArrowLeft') {
            setAnchorEl(null);
            focusPrevious();
          }
          if (event.key === 'ArrowRight') {
            setAnchorEl(null);
            focusNext();
          }
        },
      },
    });

    const open = Boolean(anchorEl);
    const id = open ? 'about-popper' : undefined;
    return (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div onMouseLeave={() => setAnchorEl(null)}>
          <ListItemButton
            aria-haspopup
            aria-expanded={open ? 'true' : 'false'}
            ref={ref}
            {...props}
            role="menuitem"
            onKeyDown={(event) => {
              props.onKeyDown?.(event);
              if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
                setAnchorEl(null);
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                targets[0]?.focus();
                setActiveIndex(0);
              }
            }}
            onFocus={(event) => setAnchorEl(event.currentTarget)}
            onMouseEnter={(event) => {
              props.onMouseEnter?.(event);
              setAnchorEl(event.currentTarget);
            }}
            sx={[open && ((theme) => theme.variants.plainHover.neutral)]}
          >
            <Person /> <KeyboardArrowDown />
          </ListItemButton>
          <Popper id={id} open={open} anchorEl={anchorEl} disablePortal keepMounted>
            <List
              role="menu"
              aria-label="About"
              variant="outlined"
              sx={{
                my: 2,
                boxShadow: 'md',
                borderRadius: 'sm',
                '--List-radius': '8px',
                '--List-padding': '4px',
                '--ListDivider-gap': '4px',
                '--ListItemDecorator-size': '32px',
              }}
            >
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(0)}>
                  <ListItemDecorator>
									<Person />
                  </ListItemDecorator>
                  Account
                </ListItemButton>
              </ListItem>
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(1)}>
                  <ListItemDecorator>
									<InfoOutlinedIcon />
                  </ListItemDecorator>
                  Instructions
                </ListItemButton>
							</ListItem>
							<ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(2)}>
                  <ListItemDecorator>
									<ExitToAppOutlinedIcon />
                  </ListItemDecorator>
                  Log Out
                </ListItemButton>
              </ListItem>
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  },
);

export default function NavBar() {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();
  return (
    <Box sx={{ minHeight: "20px" }}>
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          '--List-radius': '8px',
          '--List-padding': '4px',
          '--List-gap': '8px',
          '--ListItem-gap': '0px',
        }}
      >
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(0)}
            component="a"
            href="#navigation-menu"
          >
           <Typography>Table Map</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem role="none" sx={{ marginInlineStart: 'auto' }} >
          <AboutMenu
            onMouseEnter={() => {
              setActiveIndex(1);
              targets[1].focus();
            }}
            focusNext={focusNext}
            focusPrevious={focusPrevious}
            {...getTargetProps(1)}
          />
        </ListItem>
      </List>
    </Box>
  );
}


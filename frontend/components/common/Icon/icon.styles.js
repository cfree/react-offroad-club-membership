import styled from 'styled-components';

export const StyledIcon = styled.i`
/* 
  &[data-icon]:before {
    font-family: "4players" !important;
    content: attr(data-icon);
    font-style: normal !important;
    font-weight: normal !important;
    font-variant: normal !important;
    text-transform: none !important;
    speak: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  } */

  & [class^="icon-"],
  & [class*=" icon-"] {
    text-indent: -9999em;
    overflow: hidden;

    &:before {
      text-indent: 0;
      font-family: "4players" !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      speak: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  .icon-comment:before {
    content: "\61";
  }
  .icon-success:before {
    content: "\62";
  }
  .icon-arrow-down:before {
    content: "\63";
  }
  .icon-arrow-left:before {
    content: "\64";
  }
  .icon-arrow-right:before {
    content: "\65";
  }
  .icon-arrow-up:before {
    content: "\66";
  }
  .icon-directions:before {
    content: "\67";
  }
  .icon-location:before {
    content: "\68";
  }
  .icon-time:before {
    content: "\69";
  }
  .icon-date:before {
    content: "\6a";
  }
  .icon-menu:before {
    content: "\6b";
  }
  .icon-exit:before {
    content: "\6c";
  }
  .icon-fail:before {
    content: "\6d";
  }
  .icon-map:before {
    content: "\6e";
  }
  .icon-user:before {
    content: "\6f";
  }
  .icon-user-add:before {
    content: "\70";
  }
  .icon-list:before {
    content: "\71";
  }
  .icon-rigbook:before {
    content: "\72";
  }
  .icon-unknown:before {
    content: "\73";
  }
  .icon-mail:before {
    content: "\74";
  }
  .icon-announcements:before {
    content: "\75";
  }
  .icon-photos:before {
    content: "\76";
  }
  .icon-phone:before {
    content: "\77";
  }
  .icon-profile:before {
    content: "\78";
  }
  .icon-notification-none:before {
    content: "\79";
  }
  .icon-notification-some:before {
    content: "\7a";
  }
  .icon-edit:before {
    content: "\41";
  }
  .icon-delete:before {
    content: "\42";
  }
  .icon-add:before {
    content: "\43";
  }
  .icon-bandaid:before {
    content: "\44";
  }
  .icon-trail:before {
    content: "\45";
  }
  .icon-settings:before {
    content: "\46";
  }
  .icon-loading:before {
    content: "\47";
  }
`;

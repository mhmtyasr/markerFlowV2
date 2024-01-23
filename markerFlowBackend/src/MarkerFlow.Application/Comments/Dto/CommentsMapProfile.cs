using AutoMapper;
using MarkerFlow.Topics.Dto;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Comments.Dto
{
    public class CommentsMapProfile : Profile
    {

        public CommentsMapProfile()
        {
            CreateMap<Comments, GetCommentsDto>()
            .ForMember(dest => dest.CreatorUserId, opt => opt.Ignore())
            .ForMember(dest => dest.MentionUserIds, opt => opt.Ignore());


        }
    }
}

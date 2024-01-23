using Abp.Domain.Repositories;
using MarkerFlow.Authorization.Users;
using MarkerFlow.Comments.Dto;
using MarkerFlow.Topics;
using MarkerFlow.Topics.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Comments
{
    [Route("api/comments")]
    public class CommentsAppService : MarkerFlowAppServiceBase, ICommentAppService
    {
        private readonly IRepository<Comments, int> _repository;
        private readonly IRepository<User, long> _userRepository;

        public CommentsAppService(
           IRepository<Comments, int> repository,
           IRepository<User, long> userRepository
       )
        {

            _repository = repository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<List<GetCommentsDto>> Get(int topicId)
        {
            var datas = await _repository.GetAllListAsync(x => x.TopicId == topicId);

            List<GetCommentsDto> comments = ObjectMapper.Map<List<GetCommentsDto>>(datas);

            var allUser = await _userRepository.GetAllListAsync();

            foreach (var comment in comments)
            {
                var data = datas.FirstOrDefault(x => x.Id == comment.Id);
                comment.MentionUserIds = data.MentionUserIds != string.Empty ? data.MentionUserIds.Split(',').Select(x => int.Parse(x)).ToList() : null;
                comment.CreatorUserId = data.CreatorUserId ?? 0;
                comment.CreatorUserName = allUser.FirstOrDefault(x => x.Id == comment.CreatorUserId)?.FullName;
            }

            return comments;
        }


        [HttpPost]
        public async Task<Comments> Post(PostCommentDto input)
        {
            
            var comment = new Comments()
            {
                Comment = input.Comment,
                Element = input.Element,
                TopicId = input.TopicId,
                MentionUserIds = input.MentionUserIds != null ? string.Join(',', input.MentionUserIds) : string.Empty,
            };

            var data = await _repository.InsertAsync(comment);

            return data;

        }
    }
}

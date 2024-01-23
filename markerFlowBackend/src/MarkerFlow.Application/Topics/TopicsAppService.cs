using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using MarkerFlow.Authorization.Users;
using MarkerFlow.Comments;
using MarkerFlow.MultiTenancy;
using MarkerFlow.Topics.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Topics
{
    [Route("api/topics")]
    public class TopicsAppService :
        MarkerFlowAppServiceBase, ITopicsAppService
    {
        private readonly IRepository<Topics,int> _repository;
        private readonly CommentsManager _commentsManager;
        private readonly IRepository<User, long> _userRepository;

        public TopicsAppService(
           IRepository<Topics, int> repository,
           IRepository<User, long> userRepository,
           CommentsManager commentsManager
       )
        {

            _repository = repository;
            _commentsManager= commentsManager;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<List<Dto.GetTopicsDto>> Get()
        {
            var data = await _repository.GetAllListAsync();

            var comments = _commentsManager.GetCommentsByTopicIds(data.Select(x => x.Id).ToList());

            var topics  = new List<GetTopicsDto>();

            var allUser = await _userRepository.GetAllListAsync();

            foreach (var topic in data)
            {
                var firstComment = comments.FirstOrDefault(x => x.TopicId == topic.Id);
                var newTopic  = new GetTopicsDto()
                {
                    Id = topic.Id,
                    Title = topic.Title,
                    Element = firstComment.Element,
                    PageIconUrl = topic.PageIconUrl,
                    PageUrl = topic.PageUrl,
                    Comment = firstComment.Comment,
                    CreatorUserId = topic.CreatorUserId ?? 0,
                    MentionUserIds = firstComment.MentionUserIds != string.Empty ? firstComment.MentionUserIds.Split(',').Select(x => int.Parse(x)).ToList() : null,
                    CommentCount = comments.Count(x => x.TopicId == topic.Id),
                    CreationTime = topic.CreationTime,
                    CreateUserFullName = allUser.FirstOrDefault(x => x.Id == topic.CreatorUserId)?.FullName,

                };

                topics.Add(newTopic);
            }

            return topics;
        }

        [HttpPost]
        public async Task<Dto.GetTopicsDto> Post(PostTopicDto input)
        {
            Topics topic = ObjectMapper.Map<Topics>(input);


            topic.TenantId = AbpSession.GetTenantId();
            var newComment = new Comments.Comments() {

                Comment = input.Comment,
                MentionUserIds = input.MentionUserIds != null ? string.Join(",", input.MentionUserIds) : string.Empty,
                Element = input.Element,

            };

            if (topic.Comments == null)
            {
                topic.Comments = new List<Comments.Comments>();
            }

            topic.Comments.Add(newComment);
            await _repository.InsertAsync(topic);

            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<GetTopicsDto>(topic);
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            var topic = await _repository.GetAsync(id);

            if (topic == null)
            {
                throw new UserFriendlyException("Topic not found");
            }

            await _repository.DeleteAsync(topic);
        }


    }
}

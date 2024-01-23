using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using Abp.Runtime.Session;
using Abp.UI;
using MarkerFlow.Comments;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Topics
{
    public class  TopicManager: DomainService
    {

        private readonly IRepository<Topics> _repository;
        private readonly CommentsManager _commentsManager;

        public TopicManager(IRepository<Topics> repository,
            CommentsManager commentsManager)
        {
            _repository = repository;
            _commentsManager = commentsManager;
           
        }

        public virtual async Task CreateAsync(Topics topic)
        {
            try { 
                    await _repository.InsertAsync(topic);
            }
            catch (Exception e)
            {
                throw new UserFriendlyException(e.Message);
            }
        }

    }
}

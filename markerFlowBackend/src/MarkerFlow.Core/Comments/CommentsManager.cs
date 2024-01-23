using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkerFlow.Comments
{
    public class CommentsManager : DomainService
    {

        private readonly IRepository<Comments> _repository;

        public CommentsManager(IRepository<Comments> repository)
        {
            _repository = repository;

        }

        public void CreateAsync(Comments comment)
        {
            // Perform validation if needed
            _repository.InsertAsync(comment);
        }

        public void AddComment(Comments comment)
        {
            _repository.Insert(comment);
        }

        public IEnumerable<Comments> GetAllComments()
        {
            return _repository.GetAllList();
        }

        public  List<Comments> GetCommentsByTopicIds(List<int> topicIds ) { 
            return _repository.GetAll().Where(x => topicIds.Contains(x.TopicId)).ToList();
        }

        public Comments GetCommentById(int commentId)
        {
            return _repository.Get(commentId);
        }

        public void UpdateComment(Comments updatedComment)
        {
            _repository.Update(updatedComment);
        }

        public void DeleteComment(int commentId)
        {
            _repository.Delete(commentId);
        }

    }
}

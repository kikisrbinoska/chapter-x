using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.AISuggestion.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IAISuggestionRepository _aiSuggestionRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IAISuggestionRepository aiSuggestionRepository, ILogger<DeleteHandler> logger)
        {
            _aiSuggestionRepository = aiSuggestionRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var suggestion = await _aiSuggestionRepository.GetByIdAsync(request.Id, cancellationToken);
            if (suggestion is null)
                return new DeleteResponse(false);

            await _aiSuggestionRepository.DeleteAsync(suggestion, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}

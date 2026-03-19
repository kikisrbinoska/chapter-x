using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Writer.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IWriterRepository _writerRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IWriterRepository writerRepository, ILogger<DeleteHandler> logger)
        {
            _writerRepository = writerRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var writer = await _writerRepository.GetByIdAsync(request.Id, cancellationToken);
            if (writer is null)
                return new DeleteResponse(false);

            await _writerRepository.DeleteAsync(writer, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}

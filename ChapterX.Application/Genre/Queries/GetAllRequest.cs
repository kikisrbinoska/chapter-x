using MediatR;

namespace ChapterX.Application.Genre.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
